import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Users } from 'lucide-react';

const ViewerCount = () => {
  return (
    <Card className="bg-black/50 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-sm font-medium">Viewers</CardTitle>
            <Users className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent className="p-4">
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">watching now</p>
        </CardContent>
    </Card>
  );
};

export default ViewerCount; 