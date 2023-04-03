import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import {Grid} from "@mui/material";

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Grid container>
            <Grid item xs={12}>
                {/*<Navigation user={user} />*/}
                {children}
            </Grid>
        </Grid>
    )
}

export default AppLayout
