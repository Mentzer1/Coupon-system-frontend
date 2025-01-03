import "./Footer.css";
import { Box, Typography } from '@mui/material';

export function Footer(): JSX.Element {
    return (
        <div className="Footer">
		<Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, textAlign: 'center' }}>
          <Typography variant="body2">© 2024 Coupon Store. All rights reserved.</Typography>
        </Box>

        </div>
    );
}
