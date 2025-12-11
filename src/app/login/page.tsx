import {
  signInWithPassword,
  signUp,
  signInWithMagicLink,
} from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <form className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />

          <div className="flex gap-2">
            <button
              formAction={signInWithPassword}
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            <button
              formAction={signUp}
              className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              Sign Up
            </button>
          </div>

          <button
            formAction={signInWithMagicLink}
            className="w-full py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Magic Link
          </button>
        </form>
      </div>
    </div>
  );
}
