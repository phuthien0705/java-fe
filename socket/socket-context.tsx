import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { getCookie } from '@/common/session';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { MainContext } from '@/pages/_app';

const accessToken: string = getCookie('accessToken') || '';

const BASE_URL = process.env.SOCKET_URL || 'http://localhost:3000';

export const socket = io(BASE_URL, {
  transports: ['polling', 'websocket'],
  autoConnect: false,
  reconnection: false,
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// socket.connect();
export const MAX_RECONNECT_SOCKET_TIMES = 3;

const defautContext = {
  socket,
  haveNoti: false,
  setHaveNoti: () => undefined,
};

export interface ISocketContext {
  socket: Socket;
  haveNoti: boolean;
  setHaveNoti: Dispatch<SetStateAction<boolean>>;
}

const SocketContext = createContext<ISocketContext>(defautContext);

const SocketsProvider = ({ children }: { children: ReactNode }) => {
  const [haveNoti, setHaveNoti] = useState<boolean>(false);

  const { setBackdrop } = useContext(MainContext);
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);

  // console.log('$react-query', refetch, all);

  useEffect(() => {
    if (!socket.connected && accessToken) {
      socket.connect();
      console.log('$socket_log: socket connecting...');
      setBackdrop(true);
    }
    return () => {
      if (socket.connected) {
        console.log('$socket_log: socket disconnect');
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken) {
      let currentReconnectSokcetTimes = 0;
      socket.on('connect', () => {
        console.log('$socket_log: connect: ', socket.connected);
        setBackdrop(false);
      });

      socket.on('connect_error', (error) => {
        console.log(
          '$socket_log: connect_error: name ->',
          error.name,
          'msg ->',
          error.message
        );
        if (
          currentReconnectSokcetTimes <= MAX_RECONNECT_SOCKET_TIMES &&
          error.message !== 'Invalid_Credentials'
        ) {
          setBackdrop(true);
          socket.connect();
          console.log('$socket_log', currentReconnectSokcetTimes);
          currentReconnectSokcetTimes++;
        } else if (error.message !== 'Invalid_Credentials') {
          console.log('$socket_log: reach_max_reconnect');
          setBackdrop(false);
          toast({
            message:
              'Có lỗi xảy ra khi kết nối với máy chủ, vui lòng kiểm tra lại mạng và thử tải lại trang',
            type: 'errror',
          });
        } else {
          setBackdrop(false);
        }
      });

      socket.on('disconnect', (reason) => {
        console.log('$socket_log: reason disconect: ', reason);
        if (currentReconnectSokcetTimes <= MAX_RECONNECT_SOCKET_TIMES) {
          setBackdrop(true);
          socket.connect();
          currentReconnectSokcetTimes++;
          console.log('$socket_log', currentReconnectSokcetTimes);
          console.log('$socket_log: reconnect handshake');
        } else {
          setBackdrop(false);
          console.log('$socket_log: reach_max_reconnect');
          toast({
            message:
              'Có lỗi xảy ra khi kết nối với máy chủ, vui lòng kiểm tra lại mạng và thử tải lại trang',
            type: 'errror',
          });
        }
      });

      socket?.on('receive-follow', (...res) => {
        console.log('$socket_log receive', res);

        setHaveNoti(true);
        localStorage.setItem('haveNoti', 'true');
      });
      socket?.on('unicast-accept-follow', (res) => {
        console.log('$socket_log have accept', res);

        setHaveNoti(true);
        localStorage.setItem('haveNoti', 'true');
      });
      socket?.on('notification', (res) => {
        console.log('$socket_log have accept', res);

        setHaveNoti(true);
        localStorage.setItem('haveNoti', 'true');
      });
    }
  }, [accessToken]);

  return (
    <SocketContext.Provider value={{ socket, haveNoti, setHaveNoti }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
