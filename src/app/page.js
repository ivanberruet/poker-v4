async function callHello(){
  try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
      const contentType = res.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
      ? await res.json()
      : await res.text(); // Handle text responselet data = await res.json() 
      
      return data
  } catch (error) {
      console.log(error)
    }
}

export default async function Home() {

  const hello = await callHello();

  return (
    <div>Mensaje de la API {hello}</div>
  );
}
