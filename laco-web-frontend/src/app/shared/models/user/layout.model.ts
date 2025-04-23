export interface ItemMenu {
  route: string
  icon?: string
  label: string
  principal: boolean
  expanded?: string
  parentId?: number; // Opcional, pode ser undefined se não tiver pai
  subRecursos?: ItemMenu[]; // Lista de sub-recursos
}
