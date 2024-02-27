export async function POST({ redirect, locals }) {
  locals.session.signout();
  return redirect("/");
}
