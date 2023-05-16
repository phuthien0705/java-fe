import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { IMainCard } from '@/interfaces/compontents/card.interface';
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

const MainCard: React.FunctionComponent<IMainCard> = ({
  border = true,
  boxShadow,
  children,
  content = true,
  contentClass = '',
  contentSX = {},
  darkTitle,
  secondary,
  shadow,
  sx = {},
  title,
  elevation = 1,
  ...others
}) => {
  const theme: any = useTheme();

  return (
    <Card className="shadow" sx={sx} {...others} elevation={elevation}>
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader sx={headerSX} title={title} action={secondary} />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={headerSX}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};

export default MainCard;
