// import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
// import { useEffect } from "react";
import requestIp from 'request-ip'

export async function pathLocation(req: NextRequest) {
    const { userLat, userLng, destLat, destLng, type } = await req.json();
    if (!userLat || !userLng || !destLat || !destLng) {
        return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
    }
    const apiUrl = `https://api.openrouteservice.org/v2/directions/${type}?api_key=${process.env.OPENROUTESERVICE_API_KEY}&start=${userLng},${userLat}&end=${destLng},${destLat}`;

    try {
        const response = await fetch(apiUrl);
        const routeData = await response.json();

        if (!routeData.features || routeData.features.length === 0) {
            return NextResponse.json({ error: 'Failed to retrieve route' }, { status: 500 });
        }
      
        // Parse main feature with route information
        const feature = routeData.features[0];
        const { summary, segments } = feature.properties;
        const { distance, duration } = summary;
      
        // Extract geometry coordinates for the path
        const coordinates = feature.geometry.coordinates;
      
          // Get step-by-step instructions from segments
        const steps = segments[0].steps.map((step: any) => ({
            instruction: step.instruction,
            distance: step.distance,
            duration: step.duration,
            name: step.name,
        }));
      
        // Prepare simplified response
        const result = {
            distance, // Total distance in meters
            duration, // Total duration in seconds
            coordinates, // Route path as array of coordinates
            steps, // Step-by-step instructions
        };
      
        return NextResponse.json({ route: result });
    } catch (error) {
        console.error('Error fetching route:', error);
        return NextResponse.json({ error: 'Failed to get route' }, { status: 500 });
    }
}

export async function getLocation(req: NextRequest) {
      
}
