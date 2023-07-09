import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Weather } from "../components/weather/Weather.tsx";
import { Data, WeatherResp } from "../utils/interfaces/Interfaces.ts";

const apiKey = Deno.env.get("API_KEY");

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "Lübeck";
    const resp = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`,
    );
    if (resp.status == 200) {
      const result: WeatherResp = await resp.json();
      return ctx.render({ result, query });
    }
    return ctx.render({ result: null, query });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <body class="bg-gray-200">
        <div class="mt-10 px-5 rounded shadow bg-blue-400 mx-auto flex max-w-screen-md flex-col justify-center py-12">
          <div class="mx-auto max-w-sm w-full">
            <h2 class="text-2xl font-bold mb-5 text-center">Wetter</h2>
            <form>
              <input
                name="q"
                type="text"
                placeholder="Enter a city..."
                required
                class="w-full rounded-md  py-1.5 px-3.5  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              />
            </form>
          </div>
          <Weather data={data.result} />
        </div>
      </body>
    </>
  );
}
