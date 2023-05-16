import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { ISubCard } from '@/interfaces/compontents/card.interface';

const SubCard: React.FunctionComponent<ISubCard> = ({
  children,
  content = true,
  contentClass,
  darkTitle = false,
  secondary,
  sx = {},
  contentSX = {},
  title,
  ...others
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        },
        ...sx,
      }}
      {...others}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h5">{title}</Typography>}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h4">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: theme.palette.primary.light,
          }}
        />
      )}

      {/* card content */}
      {content && (
        <CardContent
          sx={{ p: 2.5, ...contentSX }}
          className={contentClass || ''}
        >
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};

export default SubCard;
