export async function GET({ params }) {
  const id = params.id;
  const product = await getProduct(id);

  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(
    JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

function getProduct(id) {
  return {
    id: 389238,
    name: "Product 1",
    price: 100,
  };
}
