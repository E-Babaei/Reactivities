import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();
  return (
    <>
      <Menu vertical style={{ width: "100%", marginTop: 25 }} size="large">
        <Header icon="filter" color="teal" attached content="Filters" />
        <Menu.Item
          content="All activities"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date: Date) => setPredicate("startDate", date)}
        value={predicate.get("startDate" || new Date())}
      />
    </>
  );
});
