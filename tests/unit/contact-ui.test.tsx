// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactMessages } from "@/lib/contact-messages";
import { sendContactMessage } from "@/app/actions/send-contact-message";

vi.mock("@/app/actions/send-contact-message", () => ({
  sendContactMessage: vi.fn(),
}));
afterEach(cleanup);
const action = vi.mocked(sendContactMessage);
async function fillForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Nom", { exact: true }), "Test Person");
  await user.type(
    screen.getByLabelText("Email", { exact: true }),
    "test@example.com",
  );
  await user.type(
    screen.getByLabelText("Parlez-moi de votre besoin"),
    "A synthetic request to simplify a workflow.",
  );
  return user;
}
describe("contact interface with the real next-safe-action hook", () => {
  it("associates field errors and focuses an inline summary", async () => {
    action.mockResolvedValue({
      validationErrors: {
        formErrors: [],
        fieldErrors: {
          name: ["Indiquez votre nom."],
          email: ["Indiquez une adresse email valide."],
        },
      },
    });
    render(<ContactForm available />);
    await userEvent.click(
      screen.getByRole("button", { name: /Envoyer ma demande/ }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent("Vérifiez");
    const input = screen.getByLabelText("Nom", { exact: true });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Indiquez votre nom.");
    await waitFor(() => expect(screen.getByRole("alert")).toHaveFocus());
  });
  it.each([
    "CONTACT_FAILED",
    "CONTACT_RATE_LIMITED",
    "CONTACT_UNAVAILABLE",
    "CONTACT_UNKNOWN",
  ] as const)("preserves fields for %s", async (code) => {
    action.mockResolvedValue({ serverError: code });
    render(<ContactForm available />);
    const user = await fillForm();
    await user.click(
      screen.getByRole("button", { name: /Envoyer ma demande/ }),
    );
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Nom", { exact: true })).toHaveValue(
      "Test Person",
    );
    expect(screen.getByLabelText("Parlez-moi de votre besoin")).toHaveValue(
      "A synthetic request to simplify a workflow.",
    );
    expect(
      screen.queryByText(contactMessages.accepted),
    ).not.toBeInTheDocument();
  });
  it("shows pending text, prevents double submission and only clears after acceptance", async () => {
    let accept:
      | ((value: Awaited<ReturnType<typeof sendContactMessage>>) => void)
      | undefined;
    action.mockImplementation(
      () =>
        new Promise((resolve) => {
          accept = resolve;
        }),
    );
    render(<ContactForm available />);
    const user = await fillForm();
    await user.click(
      screen.getByRole("button", { name: /Envoyer ma demande/ }),
    );
    const button = await screen.findByRole("button", { name: /Envoi…/ });
    expect(button).toBeDisabled();
    expect(screen.getByLabelText("Nom", { exact: true })).toHaveValue(
      "Test Person",
    );
    await user.click(button);
    expect(action).toHaveBeenCalledTimes(1);
    accept?.({ data: { accepted: true } });
    expect(
      await screen.findByText(contactMessages.accepted),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nom", { exact: true })).toHaveValue("");
    expect(screen.getByLabelText("Parlez-moi de votre besoin")).toHaveValue("");
  });
  it("handles an unknown network outcome without exposing or retrying the error", async () => {
    action.mockRejectedValue(new Error("private network detail"));
    render(<ContactForm available />);
    const user = await fillForm();
    await user.click(
      screen.getByRole("button", { name: /Envoyer ma demande/ }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      contactMessages.unknown,
    );
    expect(
      screen.queryByText(/private network detail/),
    ).not.toBeInTheDocument();
    expect(action).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Email", { exact: true })).toHaveValue(
      "test@example.com",
    );
  });
  it("gives form instances unique identifiers and explains unavailable delivery", () => {
    const { container } = render(
      <>
        <ContactForm />
        <ContactForm />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.getAllByText(contactMessages.unavailable)).toHaveLength(2);
  });
});
