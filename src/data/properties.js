export const properties = [
    {
        id: 1,
        title: "Luxury House",
        price: "Rs. 49.2M",
        location: "Nugegoda",
        type: "House",
        isFeatured: true,
        beds: 4,
        baths: 3,
        sqft: 2500,
        parking: "2 Spaces",
        description: "This beautiful 4-bedroom house offers modern living in a prime location. Features a spacious living area, modern kitchen, and landscaped garden. Perfect for a growing family.",
        amenities: ["Air Conditioning", "Garden", "Garage", "Security System", "Modern Kitchen", "Balcony"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "Sarah Smith",
            role: "Property Owner",
            rating: 4.8,
            reviews: 12,
            image: "/api/placeholder/100/100"
        },
        reviews: [
            { user: "John Doe", rating: 5, comment: "Excellent property! Very well maintained and great location." },
            { user: "Jane Doe", rating: 4, comment: "Beautiful house, but a bit pricey." }
        ]
    },
    {
        id: 2,
        title: "Modern 2 Bedroom Apartment",
        price: "Rs. 81,000,000",
        location: "No. 123, Main Street, Colombo 03",
        type: "Apartment",
        isFeatured: false,
        beds: 2,
        baths: 2,
        sqft: 750,
        parking: "1 Space",
        description: "This beautiful 2-bedroom apartment offers modern living in the heart of Colombo. Located in a prime location with easy access to schools, hospitals, and shopping centers. The apartment features a spacious living area, modern kitchen with built-in appliances, master bedroom with en-suite bathroom, and a guest bedroom. The building offers 24/7 security, elevator access, and parking facilities. Perfect for a small family or professional couple.",
        amenities: ["Air Conditioning", "Built-In Wardrobes", "Elevator", "Swimming Pool", "Playground", "Balcony", "24/7 Security", "Gym", "Parking", "Generator Backup"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "John Developer",
            role: "Property Owner",
            rating: 4.8,
            reviews: 24,
            image: "/api/placeholder/100/100"
        },
        reviews: [
            { user: "John Doe", rating: 5, comment: "Excellent property! Very well maintained and great location. The owner was very professional and helpful throughout the process." },
            { user: "Sarah Smith", rating: 4, comment: "Nice apartment in a good area. A bit pricey but worth it for the amenities offered." }
        ]
    },
    {
        id: 3,
        title: "Modern Family House",
        price: "Rs. 125M",
        location: "Colombo 5",
        type: "House",
        isFeatured: false,
        beds: 5,
        baths: 4,
        sqft: 3200,
        parking: "3 Spaces",
        description: "Luxurious family home with premium finishes. Features a rooftop terrace, home theater, and smart home integration.",
        amenities: ["Smart Home", "Rooftop Terrace", "Home Theater", "Solar Power", "Pool", "Maid's Room"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "Michael Chang",
            role: "Property Owner",
            rating: 4.9,
            reviews: 8,
            image: "/api/placeholder/100/100"
        },
        reviews: [
            { user: "Alice Wonder", rating: 5, comment: "Absolutely stunning property." }
        ]
    },
    {
        id: 4,
        title: "High-Floor Altair Apartment",
        price: "Rs. 110M",
        location: "Colombo 02",
        type: "Apartment",
        isSponsored: true,
        beds: 3,
        baths: 2,
        sqft: 1600,
        parking: "2 Spaces",
        description: "Experience luxury living at Altair. This high-floor apartment offers breathtaking views of the city and ocean.",
        amenities: ["Infinity Pool", "Sky Garden", "Gym", "Game Room", "Concierge", "Valet Parking"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "Altair Sales",
            role: "Developer",
            rating: 5.0,
            reviews: 156,
            image: "/api/placeholder/100/100"
        },
        reviews: []
    },
    {
        id: 5,
        title: "Cozy Havelock City Unit",
        price: "Rs. 65M",
        location: "Colombo 06",
        type: "Apartment",
        isSponsored: false,
        beds: 2,
        baths: 2,
        sqft: 1100,
        parking: "1 Space",
        description: "Well-maintained unit in Havelock City. Access to the clubhouse and large garden.",
        amenities: ["Clubhouse", "Large Garden", "Pool", "Gym", "Supermarket", "Bank"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "Mrs. Perera",
            role: "Property Owner",
            rating: 4.5,
            reviews: 5,
            image: "/api/placeholder/100/100"
        },
        reviews: []
    },
    {
        id: 6,
        title: "Capitol TwinPeaks Suite",
        price: "Rs. 75M",
        location: "Colombo 02",
        type: "Apartment",
        isSponsored: true,
        beds: 2,
        baths: 2,
        sqft: 1200,
        parking: "1 Space",
        description: "Modern suite in Capitol TwinPeaks. Ideal for investment or city living.",
        amenities: ["Infinity Pool", "Gym", "Business Center", "Cafe", "24/7 Security"],
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ],
        owner: {
            name: "Capitol Sales",
            role: "Developer",
            rating: 4.7,
            reviews: 89,
            image: "/api/placeholder/100/100"
        },
        reviews: []
    }
];
