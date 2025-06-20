import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

const ChatMessage = ({ user, message, avatar }: { user: string, message: string, avatar: string }) => {
    return (
        <div className="flex items-center gap-3 my-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={avatar} />
                <AvatarFallback>{user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <span className="font-bold text-primary">{user}</span>: <span>{message}</span>
            </div>
        </div>
    )
}

const ChatInput = () => {
    return (
        <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Type a message..." className="bg-muted" />
            <Button type="submit" variant="default">Send</Button>
        </div>
    )
}


const Chat = () => {
  return (
    <Card className="flex flex-col h-full">
        <CardHeader className="p-4">
            <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow overflow-y-auto">
            <div className="h-full pr-2">
                <ChatMessage user="Alice" message="This is awesome!" avatar="https://github.com/shadcn.png" />
                <ChatMessage user="Bob" message="I agree!" avatar="https://github.com/shadcn.png" />
                <ChatMessage user="Charlie" message="Can't wait for the next stream!" avatar="https://github.com/shadcn.png" />
                 <ChatMessage user="Alice" message="This is awesome!" avatar="https://github.com/shadcn.png" />
                <ChatMessage user="Bob" message="I agree!" avatar="https://github.com/shadcn.png" />
                <ChatMessage user="Charlie" message="Can't wait for the next stream!" avatar="https://github.com/shadcn.png" />
            </div>
        </CardContent>
        <div className="p-4 border-t">
            <ChatInput />
        </div>
    </Card>
  );
};

export default Chat; 