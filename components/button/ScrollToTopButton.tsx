import { Button, Fab } from '@mui/material';
import { useEffect, useState, useCallback, memo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { scrollToTop } from '@/utils/scrollToTop';

const ScrollToTopButton: React.FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      !visible && setVisible(true);
    } else if (scrolled <= 300) {
      visible && setVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <Button sx={{ width: 'fit-content', height: 'fit-content' }}>
      <Fab
        onClick={scrollToTop}
        style={{
          display: visible ? 'flex' : 'none',
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        color="secondary"
        size="small"
        aria-label="scroll back to top"
      >
        <ArrowUpwardIcon />
      </Fab>
    </Button>
  );
};

export default memo(ScrollToTopButton);
