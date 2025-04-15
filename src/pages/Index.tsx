
import React, { useState, useMemo } from 'react';
import UserCard, { UserProfile } from '../components/UserCard';
import SearchFilters from '../components/SearchFilters';

// Mock data for initial development
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Alex Chen',
    location: 'San Francisco, CA',
    avatar: '',
    skills: [
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Node.js', level: 'Intermediate' },
    ],
    hackathons: ['ETH Global', 'Encode x Solana'],
    isRemote: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    location: 'New York, NY',
    avatar: '',
    skills: [
      { name: 'UI/UX', level: 'Expert' },
      { name: 'Figma', level: 'Expert' },
      { name: 'React', level: 'Intermediate' },
    ],
    hackathons: ['ETH Global', 'Design Week Hackathon'],
    isRemote: false,
  },
  {
    id: '3',
    name: 'Mike Williams',
    location: 'London, UK',
    avatar: '',
    skills: [
      { name: 'Solidity', level: 'Expert' },
      { name: 'Smart Contracts', level: 'Expert' },
      { name: 'Web3.js', level: 'Intermediate' },
    ],
    hackathons: ['ETH London', 'Encode x Solana'],
    isRemote: true,
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    skills: string[];
    locations: string[];
  }>({
    skills: [],
    locations: [],
  });

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // Search query filter
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Skills filter
      const matchesSkills = activeFilters.skills.length === 0 ||
        activeFilters.skills.every((skill) =>
          user.skills.some((userSkill) =>
            userSkill.name.toLowerCase() === skill.toLowerCase()
          )
        );

      // Location filter
      const matchesLocation = activeFilters.locations.length === 0 ||
        activeFilters.locations.some((location) =>
          user.location.toLowerCase().includes(location.toLowerCase())
        );

      return matchesSearch && matchesSkills && matchesLocation;
    });
  }, [searchQuery, activeFilters]);

  const handleSkillFilter = (skill: string) => {
    if (!activeFilters.skills.includes(skill)) {
      setActiveFilters((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleLocationFilter = (location: string) => {
    if (!activeFilters.locations.includes(location)) {
      setActiveFilters((prev) => ({
        ...prev,
        locations: [...prev.locations, location],
      }));
    }
  };

  const handleRemoveFilter = (type: 'skills' | 'locations', value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Hackathon Teammate Finder
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect teammates for your next hackathon
        </p>
      </div>

      <SearchFilters
        onSearchChange={setSearchQuery}
        onSkillFilter={handleSkillFilter}
        onLocationFilter={handleLocationFilter}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
