import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Button from "./Button.vue";
import { expect } from "vitest";

test.skip("renders button with correct text", async () => {
  const text = "Click Me";
  const { getByText } = render(Button, { props: { text } });

  expect(getByText(text)).toBeInTheDocument();
});

test.skip("renders button with primary variant class by default", async () => {
  const text = "Click Me";
  const click = () => null;
  const { getByText } = render(Button, { props: { text, click } });

  const button = getByText(text);

  expect(button).toHaveClass("bg-slate-500", "hover:bg-green-900");
});

test.skip("renders button with secondary variant class when variant is provided", async () => {
  const text = "Click Me";
  const click = () => null;
  const { getByText } = render(Button, {
    props: { text, variant: "secondary", click },
  });

  const button = getByText(text);

  expect(button).toHaveClass("bg-slate-300", "hover:bg-amber-900");
});

test.skip("calls provided click function when button is clicked", async () => {
  const text = "Click Me";
  const clickMock = vi.fn();
  const { getByText } = render(Button, {
    props: { text, click: clickMock },
  });

  const button = getByText(text);
  fireEvent.click(button);

  expect(clickMock).toHaveBeenCalled();
});
