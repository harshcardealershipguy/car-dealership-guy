import {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'
import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import usePrevious from "@/hooks/usePrevious";

const Message = () => {

    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingConversations, setIsLoadingConversations] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [isStartADealLoading, setIsStartADealLoading] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const previousMessages = usePrevious(messages);
    const router = useRouter();
    const messagesEndRef = useRef(null)

    const { otherUserExternalId } = router.query

    const schema = yup.object({
        content: yup.string().required(),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm({  resolver: yupResolver(schema), mode: "onSubmit" });

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest"})
        }, 500);
    }

    const fetchMessages = async () => {
        await axios
            .get('/api/messages/' + otherUserExternalId)
            .then(res => res.data)
            .then(data => {setMessages(data.messages); setOtherUser(data.otherUser)})
    }

    useEffect(() => {
        //if there is a new message, scroll to the bottom
        if(previousMessages) {
            if (previousMessages.length !== messages.length) {
                scrollToBottom();
            }
        }
    }, [messages])

    const fetchConversations = async () => {
        await axios
            .get('/api/conversations')
            .then(res => res.data)
            .then(data => setConversations(data));
    }

    useEffect( () => {
        async function loadMessages() {
            setMessages([]);
            setOtherUser(null);
            setIsLoadingMessages(true);
            await fetchMessages();
            setIsLoadingMessages(false);
        }

        async function loadConversations() {
            setConversations([]);
            setIsLoadingConversations(true);
            await fetchConversations();
            setIsLoadingConversations(false);
        }

        if(otherUserExternalId) {
            loadMessages();
        }
        loadConversations();

    }, [otherUserExternalId]);

    useEffect(() => {
        const interval = setInterval(async () => {

            await fetchMessages();
            await fetchConversations();
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    }, [otherUserExternalId]);


    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const saveData = async (data) => {
        setIsButtonLoading(true);

        await csrf();

        await axios
            .post('/api/messages/' + otherUserExternalId, data)
            .then(res => res.data)
            .then(async () => { await fetchMessages()}) //TODO: this should just be combined with the above POST
            .then(async () => { await fetchConversations()});

        setIsButtonLoading(false);

        // reset form after successful submission
        reset();
    };

    const renderMessageFromMe = (message) => {
        return (
            <Grid key={message.id} container spacing={1}>
                <Grid item>
                    <Avatar>H</Avatar>
                </Grid>
                <Grid item>
                    <Chip sx={{py: 3, px: 1, mb: 2}} size={'medium'} style={{fontSize: '16px'}} label={message.content} variant="filled" />
                </Grid>
            </Grid>
        )
    }

    const renderMessageFromOther = (message) => {
        return (
            <Grid key={message.id} container spacing={1} justifyContent={'flex-end'}>
                <Grid item>
                    <Chip sx={{py: 3, px: 1, mb: 2}} style={{fontSize: '16px'}} label={message.content} color="primary" variant="filled" />
                </Grid>
                <Grid item>
                    <Avatar>Y</Avatar>
                </Grid>
            </Grid>
        )
    }

    const onClickStartADeal = () => {
        setIsStartADealLoading(true);
        //TODO: do something
        setTimeout(() => {
            setIsStartADealLoading(false);

        }, 2000)
    }

    return (
        <AppLayout>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item md={2}>

                    <Paper sx={{py: 2, my: 2}} elevation={0} style={{height: '600px', overflowY: 'scroll'}}>
                        <Typography variant={'h6'} textAlign={'center'} fontWeight={'bold'}>Your Conversations</Typography>

                        {isLoadingConversations && (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress />
                            </div>
                        )}

                        <List sx={{ width: '100%'}} sx={{
                            // selected and (selected + hover) states
                            '&& .Mui-selected, && .Mui-selected:hover': {
                                bgcolor: 'primary.main',
                                '&, & .MuiListItemIcon-root': {
                                    color: 'white',
                                },
                            }
                        }}>

                            {conversations.map(conversation => {
                                return (
                                    <Box key={conversation.other_user_external_id}>
                                        <ListItemButton selected={conversation.other_user_external_id === otherUserExternalId} alignItems="flex-start" onClick={() => { router.push('/message/' + conversation.other_user_external_id ) }}>
                                            <ListItemAvatar>
                                                <Avatar alt={conversation.name}  />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={conversation.name}
                                                secondary={conversation.content}
                                            />
                                        </ListItemButton>

                                        <Divider component="li" />
                                    </Box>
                                );
                            })}
                        </List>
                    </Paper>

                </Grid>
                <Grid item md={5}>

                    {otherUser &&
                        (<><Typography variant={'h4'} fontWeight={'bold'}>Conversation with {otherUser?.name}</Typography>

                            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                                <Grid item>
                                    <Typography variant={'body1'} color={'gray'}>Once you've picked out a vehicle or 2, start a deal to move forward.</Typography>
                                </Grid>
                                <Grid item>
                                    <LoadingButton variant={'contained'} size={'large'} loading={isStartADealLoading} onClick={onClickStartADeal} color={'success'}>Start a Deal!</LoadingButton>
                                </Grid>
                            </Grid>
                        </>)}

                    <Paper sx={{px: 2, py: 2, my: 2}} elevation={0} style={{height: '400px', overflowY: 'scroll'}}>

                        {isLoadingMessages && (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress />
                            </div>
                        )}

                        {
                            messages.map(message => {
                                return message.from_user_external_id === otherUserExternalId ? renderMessageFromOther(message) : renderMessageFromMe(message)
                            })
                        }
                        <div ref={messagesEndRef} />
                    </Paper>

                    <form onSubmit={handleSubmit(saveData)}>
                        <TextField
                            {...register('content')}
                            fullWidth
                            placeholder="Type your message here"
                            multiline
                            rows={5}
                            className={'white-background'}
                            style={{borderRadius: '20px'}}
                        />

                        <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isButtonLoading}>Send</LoadingButton>
                    </form>

                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default Message
