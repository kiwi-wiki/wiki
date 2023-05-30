import { CommandEmpty as Empty, useCommandState } from 'cmdk';

export function CommandEmpty() {
  const search = useCommandState(state => state.search);
  return (
    <Empty>
      <b>{search}</b>
      <span>에 대한 검색 결과가 없습니다</span>
    </Empty>
  );
}
