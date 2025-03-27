import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Subject } from 'rxjs';
export const MODAL_DATA = new InjectionToken<{}>('MODAL_DATA');

@Injectable({
    providedIn: 'root',
})
export class ModalService<T> {
    private _component: ComponentType<T>;
    private _overlayRef: OverlayRef;
    private _onClosed: Subject<any> = new Subject<any>();
    private _openedModals: OverlayRef[] = [];

    constructor(private _overlay: Overlay, private _injector: Injector) { }
    component(component: ComponentType<T>) {
        this._component = component;
        return this;
    }

    open(data?: any): OpenedModal {
        if (!this._component)
            throw 'O componente a ser aberto não foi informado, utilize a função component()';

        this._overlayRef = this._createOverlayRef();
        this._overlayRef.attach(this._createComponentInstance(data));
        this._openedModals.push(this._overlayRef);

        window.addEventListener('popstate', this._handlePopState.bind(this));

        return {
            dismiss: (data?: any) => this.dismiss(data),
        };
    }

    dismiss(data?: any): any {
        const lastModal = this._openedModals.pop();
        if (lastModal) {
            lastModal.detach();
            this._onClosed.next(data);

            if (this._openedModals.length === 0) {
                window.removeEventListener('popstate', this._handlePopState.bind(this));
            }
        }
        return this._onClosed;
    }

    onDismiss() {
        return this._onClosed;
    }

    private _injectParams(data: any) {
        const injectorTokens = new WeakMap<any, any>([
            [MODAL_DATA, data || {}],
        ]);
        return new PortalInjector(this._injector, injectorTokens);
    }

    private _createOverlayRef() {
        return this._overlay.create({
            hasBackdrop: true,
            positionStrategy: this._createStrategyPosition(),
        });
    }

    private _createStrategyPosition() {
        return this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }

    private _createComponentInstance(data) {
        return new ComponentPortal(
            this._component,
            null,
            this._injectParams(data)
        );
    }

    private _handlePopState(event: PopStateEvent) {
        if (this._openedModals.length > 0) {
            this.dismiss();
        }
    }
}

interface OpenedModal {
    dismiss():any;
}
