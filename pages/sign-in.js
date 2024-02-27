// TODO: move the sign-in logic to index.astro
export async function POST({ request, redirect, locals }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const action = formData.get("action");
  const returnTo = formData.get("returnTo") || "/home";
  
  console.log({
    username,
    action,
  });
  
  if (username) {
    locals.session.signin(username);
    return redirect(returnTo);
  } else {
    // TODO: don't return a JSON response
    return new Response(JSON.stringify({
      message: `You need to provide a username`,
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
