import { kebabToCamel } from '@/features/share/kebabToCamel';
import { AsideOptions } from '@/model/constants/routes/asideOptions';
import { EnableUrlType } from '@/model/types/share/type';
import useCheckBoxState from './useCheckboxState';

export default function useCheckBoxGroupState(initialPermission: EnableUrlType) {
  return Object.fromEntries(
    Object.entries(AsideOptions).map(([nav, { asideItems }]) => {
      const items = asideItems.map(({ link }) => kebabToCamel(link));
      const state = useCheckBoxState(items, false, initialPermission[nav]);
      return [nav, state];
    })
  );
}