import { useNavigation, useParams } from "@remix-run/react";
import { Menu as MenuComponent } from "~/components";
export const Menu = () => {
  const { station } = useParams();
  const { state, location } = useNavigation();

  if (station === undefined) return null;

  return (
    <MenuComponent
      station={station}
      loading={state === "loading"}
      pathname={location?.pathname}
    />
  );
};
