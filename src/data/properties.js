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
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "Sarah Smith",
            role: "Property Owner",
            rating: 4.8,
            reviews: 12,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
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
        description: "This beautiful 2-bedroom apartment offers modern living in the heart of Colombo. Located in a prime location with easy access to schools, hospitals, and shopping centers.",
        amenities: ["Air Conditioning", "Built-In Wardrobes", "Elevator", "Swimming Pool", "Playground", "Balcony", "24/7 Security", "Gym", "Parking", "Generator Backup"],
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "John Developer",
            role: "Property Owner",
            rating: 4.8,
            reviews: 24,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        reviews: [
            { user: "John Doe", rating: 5, comment: "Excellent property! Very well maintained and great location." },
            { user: "Sarah Smith", rating: 4, comment: "Nice apartment in a good area." }
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
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "Michael Chang",
            role: "Property Owner",
            rating: 4.9,
            reviews: 8,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
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
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512918760532-3ed0006faf67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502005229766-939cb934d60b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "Altair Sales",
            role: "Developer",
            rating: 5.0,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
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
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "Mrs. Perera",
            role: "Property Owner",
            rating: 4.5,
            reviews: 5,
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
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
            "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502005229766-939cb934d60b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        owner: {
            name: "Capitol Sales",
            role: "Developer",
            rating: 4.7,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        reviews: []
    }
];
