
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface UserProfile {
  id: string;
  name: string;
  location: string;
  avatar: string;
  skills: Skill[];
  hackathons: string[];
  isRemote: boolean;
}

const UserCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.location}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill.name} variant="secondary" className="bg-purple-100 text-purple-800">
                {skill.name} • {skill.level}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Interested in Hackathons:</p>
          <div className="flex flex-wrap gap-2">
            {user.hackathons.map((hackathon) => (
              <Badge key={hackathon} variant="outline">
                {hackathon}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="w-full" variant="default">
          <MessageCircle className="w-4 h-4 mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
