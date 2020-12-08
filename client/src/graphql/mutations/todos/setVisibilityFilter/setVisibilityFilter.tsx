
import { VisibilityFilter } from "@/graphql/models/VisibilityFilter";
import { ReactiveVar } from "@apollo/client";

export default (visibilityFilterVar: ReactiveVar<VisibilityFilter>) => {
  return (filter: VisibilityFilter) => {
    visibilityFilterVar(filter);
  }
}
