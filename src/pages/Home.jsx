import MainTextContainer from '../components/MainTextContainer';
import TextContainer from '../components/TextContainer';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const mainText = {
    title: 'Production material flow',
    description:
      "System zarządzania zleceniami które muszą być współdzielone z kooperantami zewnętrznymi. Od tej pory panujesz nad przepływem materiału wydanego na zewnątrz.",
    image: '/images/produkcja_maindark.jpg',
    imageText: 'main page image',
    linkText: '',
  };
  
  const texts = [
    {
      title: 'Zarządzanie zleceniami',
      date: '',
      description:
        'Importuj zlecenia z pliku csv, następnie wygeneruj etykietę. Dzięki etykiecie łatwo będziesz identyfikował detal i koordynował przepływ przez poszczególne magazyny. Dostępna elektroniczna dokumentacja wykluczy ilość pomyłek.',
      image: '/images/dane.jpg',
      imageLabel: 'Tabela zleceń',
    },
    {
      title: 'Skanowanie etykiet',
      date: '',
      description:
        'Błyskawiczne przesunięcie detali na inny magazyn. Zeskanuj etykietę i przypisz aktualny magazyn. Nie trać czasu na wzrokową identyfikację i ręczne edytowanie zleceń. Czas to pieniądz.',
      image: '/images/skaner.jpg',
      imageLabel: 'Skaner',
    },
  ];

export default function Home() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                <MainTextContainer post={mainText} />
                <Grid container spacing={4}>
                    {texts.map((text) => (
                    <TextContainer key={text.title} post={text} />
                    ))}
                </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}