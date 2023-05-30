import { SubItems } from '@/components/CommandMenu/SubItems';
import { getCateogryRoutes } from '@/utils/navigation';
import { CommandItem } from 'cmdk';
import { BiCategoryAlt } from 'react-icons/bi';

interface HomeItemsProps {
  searchProjects: (page: string) => void;
}

export function HomeItems({ searchProjects }: HomeItemsProps) {
  const routes = getCateogryRoutes();

  return (
    <>
      {routes.map(route => (
        <CommandItem key={route.href} onSelect={() => searchProjects(route.name)}>
          <BiCategoryAlt size={20} />
          {route.name}
        </CommandItem>
      ))}
      <SubItems />
    </>
  );
}
