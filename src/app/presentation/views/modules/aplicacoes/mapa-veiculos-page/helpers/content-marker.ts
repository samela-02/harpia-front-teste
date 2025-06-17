export const contentMarker = (content: string, imageUrl: string, idEquipamento: string, dtPedido?: string) => {
  const hasValidImage = imageUrl && imageUrl !== '' && imageUrl !== 'assets/no-content.png';

  const imageContent = hasValidImage
    ? `<img class="w-full h-[130px] object-cover min-w-[220px] rounded-t-lg relative" src="data:image/png;base64, ${imageUrl}" >
    <span class="absolute bottom-10 left-0 font-semibold text-cyan-950 bg-slate-50/70 px-[5px] py-[2px] rounded-sm text-[8px]">
    <i class="la la-calendar mr-[2px]"></i>
    ${dtPedido}
    </span>
    </img>`
    : `<div class="w-full h-[130px] min-w-[220px] rounded-t-lg bg-slate-50 flex items-center justify-center text-gray-500">
         <div class="text-center flex-center flex-col">
           <i class="la la-image text-4xl mb-2"></i>
           <label class="text-sm">Nenhuma imagem disponível</label>
         </div>
       </div>`;

  return `
    <div class="flex flex-col items-center justify-center">
      ${imageContent}
      <div class="w-full rounded-b-lg bg-white text-primary px-3 py-2 flex-center justify-between">
        <span class="text-xs flex-center gap-1">
          <i class="la la-camera" style="font-size:15px; line-height: 0"></i>
          <span class="font-semibold">
            ${idEquipamento}
          </span>
        </span>
        <button class="button-action" title="Detalhes do Equipamento">
         <i class="la la-camera-retro" style="font-size:15px;"></i>
       </button>
      </div>
    </div>
  `;
};
