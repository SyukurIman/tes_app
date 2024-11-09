import { NextRequest, NextResponse } from "next/server";

export async function pathLocation(req: NextRequest) {
  const { userLat, userLng, destLat, destLng, type } = await req.json();
  if (!userLat || !userLng || !destLat || !destLng) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  try {
    // const response = await fetch(apiUrl);
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${type}/geojson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          Authorization: `${process.env.OPENROUTESERVICE_API_KEY}`,
        },
        body: JSON.stringify({
          coordinates: [
            [userLng, userLat],
            [destLng, destLat],
          ],
          extra_info: ["steepness", "waytype"],
        }),
      }
    );

    const routeData = await response.json();
    if (!routeData.features || routeData.features.length === 0) {
      return NextResponse.json(
        { message: routeData },
        { status: 500 }
      );
    }

    const feature = routeData.features[0];
    const { distance, duration } = feature.properties.segments[0];
    const coordinates = feature.geometry.coordinates;

    const result = {
      distance,
      duration,
      coordinates,
    };

    return NextResponse.json({ route: result });
  } catch (error) {
    console.error("Error fetching route:", error);
    return NextResponse.json({ error: "Failed to get route" }, { status: 500 });
  }
}
