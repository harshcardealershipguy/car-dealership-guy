import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "@/lib/axios";
import moment from "moment/moment";

const ConversationsList = () => {

    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/conversations')
            .then(res => res.data)
            .then(data => setConversations(data))
            .then(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading && (
                <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '30px'}} >
                    <CircularProgress />
                </div>
            )}

            {conversations.length > 0 && (
                <>
                    <Typography variant={'h6'} fontWeight={'bold'} sx={{mt: 3}}>Your Conversations</Typography>
                    <TableContainer>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Last Message</TableCell>
                                    <TableCell align="center">Sent At</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {conversations.map((conversation) => {
                                    return (
                                        <TableRow
                                            key={conversation.other_user_external_id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="center">{conversation.name}</TableCell>
                                            <TableCell align="center">{conversation.content}</TableCell>
                                            <TableCell align="center">{moment(conversation.last_message_at).utcOffset(0).fromNow()}</TableCell>
                                            <TableCell align="right">
                                                <Link href={'/message/' + conversation.other_user_external_id}>
                                                    <Button variant={'outlined'}>View Messages</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );

}

export default ConversationsList
