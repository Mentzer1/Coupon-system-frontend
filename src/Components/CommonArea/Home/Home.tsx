import "./Home.css";
import { Grid, Typography } from '@mui/material';

export function Home(): JSX.Element {
    return (
        <div className="Home">
            <Grid container spacing={3} sx={{ p: 3 }} className="home-grid">
                <Grid item xs={12}>
                    <Typography variant="h3" className="title" gutterBottom>
                        Welcome to the Coupon Store
                    </Typography>
                    <Typography variant="body1" className="description">
                        Explore amazing coupons, manage customers, and collaborate with companies.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
