"use client";
import { createParty } from "@/app/actions";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const PartyForm = () => {
  const [error, setError] = useState("");
  const { pending } = useFormStatus();

  const actionWrapper = async (formData: FormData) => {
    const body = await createParty(formData);
    if (body.error) {
      setError(body.error);
      return;
    }
    //success
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add a Party</h1>

      <form action={actionWrapper} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Party Name"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        ></textarea>

        <input
          type="text"
          name="month"
          placeholder="Month"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        />

        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        />

        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
        />

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PartyForm;
