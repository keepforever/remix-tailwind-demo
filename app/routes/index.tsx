import { useEffect, useRef } from "react";
import { Form, useTransition } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { Transition } from "@remix-run/react/transition";

type ActionData = {
  firstName: string;
};

export let action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const formData = await request.formData();
  const values: any = Object.fromEntries(formData);
  console.log("\n", `values = `, values, "\n");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: values.firstName,
      });
    }, 3000);
  });
};

const useResetFormAfterSubmit = ({
  ref,
  transition,
}: {
  ref: React.RefObject<HTMLFormElement>;
  transition: Transition;
}) => {
  useEffect(() => {
    if (ref.current && transition.state === "idle") {
      ref.current.reset();
    }
  }, [transition]);
};

export default function Index() {
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();
  const isSubmittingFirstName =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "submitName";

  useResetFormAfterSubmit({ ref, transition });

  return (
    <div className="bg-green-100">
      <h1>Welcome to Remix</h1>
      <Form method="post" ref={ref}>
        <div
          className="flex flex-col items-center p-8"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <input type="text" name="firstName" />
          <button
            className="inline-flex items-center bg-green-500"
            disabled={isSubmittingFirstName}
            type="submit"
            name="_action"
            value="submitName"
          >
            {isSubmittingFirstName ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quick-Start Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
