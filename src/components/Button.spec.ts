import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Button from "./Button.vue";
import { expect } from "vitest";

test("renders button with correct text", async () => {
  const text = "Click Me";
  const click = () => null;
  const { getByText } = render(Button, { props: { text, click } });

  expect(getByText(text)).toBeInTheDocument();
});

test("renders button with primary variant class by default", async () => {
  const text = "Click Me";
  const click = () => null;
  const { getByText } = render(Button, { props: { text, click } });

  const button = getByText(text);

  expect(button).toHaveClass("bg-blue-600", "hover:bg-blue-700");
});

test("calls provided click function when button is clicked", async () => {
  const text = "Click Me";
  const clickMock = vi.fn();
  const { getByText } = render(Button, {
    props: { text, click: clickMock },
  });

  const button = getByText(text);
  fireEvent.click(button);

  expect(clickMock).toHaveBeenCalled();
});
