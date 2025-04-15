
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearchChange: (query: string) => void;
  onSkillFilter: (skill: string) => void;
  onLocationFilter: (location: string) => void;
  activeFilters: {
    skills: string[];
    locations: string[];
  };
  onRemoveFilter: (type: 'skills' | 'locations', value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearchChange,
  onSkillFilter,
  onLocationFilter,
  activeFilters,
  onRemoveFilter,
}) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search teammates..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Filter by skill..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSkillFilter((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Filter by location..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onLocationFilter((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
      {(activeFilters.skills.length > 0 || activeFilters.locations.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-2"
                onClick={() => onRemoveFilter('skills', skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {activeFilters.locations.map((location) => (
            <Badge key={location} variant="secondary" className="bg-blue-100 text-blue-800">
              {location}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-2"
                onClick={() => onRemoveFilter('locations', location)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
