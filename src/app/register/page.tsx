import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/');
  }

  async function signUp(formData: FormData) {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/?message=Could not authenticate user');
    }

    return redirect('/?message=Check email to continue sign in process');
  }

  return (
    <main className="border-um-navy-blue flex min-h-screen flex-col items-center justify-center border-[16px] p-12">
      <form
        className="flex w-full max-w-md flex-1 flex-col justify-center gap-2"
        action={signUp}
      >
        <label className="text-md" htmlFor="firstName">
          First Name
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="text"
          name="firstName"
          placeholder="Tony"
          required
        />

        <label className="text-md" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="text"
          name="lastName"
          placeholder="Landshark"
          required
        />

        <label className="text-md" htmlFor="email">
          Phone Number
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="lastName"
          placeholder="555-555-5555"
          required
        />

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <button className="bg-um-red mb-2 rounded-sm px-4 py-2 text-white">
          Create Account
        </button>
        <Link className="text-um-powder-blue underline" href={'/login'}>
          Log In
        </Link>
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center">{searchParams.message}</p>
        )}
      </form>
    </main>
  );
}
