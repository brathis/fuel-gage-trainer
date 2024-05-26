import { describe, expect, test } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let fixture: ComponentFixture<OverlayComponent>;
  let component: OverlayComponent;
  let getContextMock: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [OverlayComponent] });
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    getContextMock = jest.fn().mockReturnValue(null);
    HTMLCanvasElement.prototype.getContext = getContextMock;
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should contain canvas', () => {
    const overlayElement: HTMLElement = fixture.nativeElement;
    const canvasElement = overlayElement.querySelector('canvas');
    expect(canvasElement).not.toBeNull();
  });

  test('should set canvas size', () => {
    fixture.detectChanges();

    const overlayElement: HTMLElement = fixture.nativeElement;
    const canvasElement = overlayElement.querySelector('canvas');
    expect(canvasElement?.width).toBe(180);
    expect(canvasElement?.height).toBe(130);
  });

  test('should obtain context', () => {
    fixture.detectChanges();

    expect(getContextMock).toHaveBeenCalledTimes(1);
  });

  test('should set up context', () => {
    const context = {
      reset: jest.fn(),
      translate: jest.fn(),
    };
    getContextMock = jest.fn().mockReturnValue(context);
    HTMLCanvasElement.prototype.getContext = getContextMock;

    fixture.detectChanges();

    expect(context.reset).toHaveBeenCalledTimes(1);
    expect(context.translate).toHaveBeenCalledWith(90, 0);
  });
});
