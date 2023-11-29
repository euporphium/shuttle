import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function signOut() {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/login');
  }

  return (
    <main className="border-um-navy-blue flex min-h-screen flex-col items-center justify-center border-[16px] p-12">
      {user ? (
        <form action={signOut} className="grid place-items-center text-center">
          <button className="bg-um-red mb-2 rounded-sm px-4 py-2 text-white">
            Log Out
          </button>
        </form>
      ) : (
        <div className="grid place-items-center text-center">
          <h1 className="mb-8 text-5xl">Reserve Your Shuttle</h1>
          <Link
            href="/register"
            className="bg-um-red hover:bg-um-red/80 mb-2 w-full rounded-sm px-8 py-4 text-center text-white"
          >
            Create a New Account
          </Link>
          <Link
            href="/login"
            className="bg-um-navy-blue hover:bg-um-navy-blue/80 mb-2 w-full rounded-sm px-4 py-2 text-center text-white"
          >
            Log In To Manage Reservations
          </Link>
        </div>
      )}
    </main>
  );
}
