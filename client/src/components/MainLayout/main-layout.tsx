import { Grid } from '@mui/material';
import { Props } from 'src/interfaces';
import Header from '../Header/header';
import Footer from '../Footer/footer';

export default function MainLayout(props: Props) {
  const { children } = props;

  return (
    <Grid container direction="column" minHeight="100vh">
      <Grid item>
        <Header {...props} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {children}
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}
