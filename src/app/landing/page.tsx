import { passwordChecker } from "../actions";

export default async function CreateProduct() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 bg-white shadow p-4 md:p-8 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to <br />
          Sweet Delight
          <br />
          Website
        </h1>

        <form action={passwordChecker} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Sweet Delights - Landing",
};
