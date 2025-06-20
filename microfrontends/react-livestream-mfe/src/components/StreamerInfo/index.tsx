import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

const StreamerInfo = () => {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-primary">John Doe</CardTitle>
                <p className="text-sm text-muted-foreground">JohnDoe's Awesome Stream</p>
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <p className="text-sm">Welcome to my channel! I stream every day at 8 PM EST. Don't forget to follow and subscribe!</p>
        </CardContent>
    </Card>
  );
};

export default StreamerInfo; 