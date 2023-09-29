import type { Server, Socket } from "socket.io";
import { useReadings } from "~/hooks/useReadings";
import {
  getStationByUUID,
  createStation,
  updateStationLastContactedAt,
} from "~/models/stations";

type SocketBootData = {
  uuid: string;
  name: string;
  location: string;
};

type SocketData = SocketBootData & {
  epoch: number;
  temperature: number;
  pressure: number;
  humidity: number;
  iaq: number;
  staticIaq: number;
  eco2: number;
  bvoc: number;
  gasResistance: number;
  gasPercentage: number;
  iaqAccuracy: 0 | 1 | 2 | 3;
  staticIaqAccuracy: 0 | 1 | 2 | 3;
  bvocAccuracy: 0 | 1 | 2 | 3;
  co2Accuracy: 0 | 1 | 2 | 3;
  gasPercentageAccuracy: 0 | 1 | 2 | 3;
  stabStatus: 0 | 1;
  runInStatus: 0 | 1;
  vbat: number;
};

interface ServerToClientEvents {
  ack: (s: string) => void;
  msg: (o: SocketData) => void;
  boot: (o: SocketBootData) => void;
}

interface ClientToServerEvents {
  msg: (o: SocketData) => void;
  boot: (o: SocketBootData) => void;
  disconnect: () => void;
}

interface InterServerEvents {
  ping: () => void;
  ack: () => void;
}

const LOG_PREFIX = "[WSS]";

const handleSocketEvent = (
  socket: Socket,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  console.log(
    [LOG_PREFIX, "New client with id", socket.id, "connected"].join(" "),
  );

  socket.emit("ack", "connected!");

  console.dir(socket.handshake.headers["user-agent"]);

  // When we receive a boot message from a station we create the station
  // if it doesn't already exist. Once created we broadcast the boot
  // message to all other clients (the browsers) so they can update their
  // UIs.
  socket.on("boot", ({ uuid, name, location }: SocketBootData) => {
    console.log(
      [LOG_PREFIX, "Got boot message from", socket.id, ":"].join(" "),
    );
    console.dir({ uuid, name, location });
    getStationByUUID(uuid).then((station) => {
      if (station) {
        updateStationLastContactedAt(uuid).then((station) => {
          console.log(
            [LOG_PREFIX, "Station with UUID", station.uuid, "updated:"].join(
              " ",
            ),
          );
          console.dir(station);
        });
        return;
      }

      createStation(uuid, name).then((station) => {
        console.log(
          [LOG_PREFIX, "Station with UUID", station.uuid, "created:"].join(" "),
        );
        console.dir(station);
        socket.broadcast.emit("boot", { uuid, name, location });
      });
    });
  });

  // When we receive a message from a station we broadcast it to all other
  // clients (the browsers) so they can update their UIs. We also save the
  // readings to the database.
  socket.on("msg", (data: SocketData) => {
    console.log([LOG_PREFIX, "Got message from", socket.id, ":"].join(" "));
    console.dir(data);
    socket.broadcast.emit("msg", data);
    useReadings({ data }).then((readings) => {
      readings && console.dir(readings);
    });
  });

  socket.on("disconnect", (_reason) => {
    console.log(
      [LOG_PREFIX, "Client with id", socket.id, "disconnected."].join(" "),
    );
  });
};

export { handleSocketEvent };
export type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
  SocketBootData,
};
