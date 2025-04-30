export const contentMarker = (content: string, imageUrl: string, idEquipamento: string) => {
  return `
    <div class="flex flex-col items-center justify-center">
    <img class="w-full h-[130px] object-cover min-w-[220px] rounded-t-lg  relative" src="${imageUrl}" >
    </img>
    <div class="w-full rounded-b-lg bg-white text-primary px-3 py-2 flex-center justify-between">
    <span class="text-xs flex-center gap-1">
    <i class="la la-camera" style="font-size:15px; line-height: 0"> </i>
    <span class="font-semibold">
    ${idEquipamento}
    </span>
    </span>
    <button class="button-action" title="Solicitar snapshot">
    <i class="la la-camera-retro" style="font-size:15px;"></i>
    </button>
    </div>
    </div>
    `
    ;
};