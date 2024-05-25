import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent {
  private static readonly y1 = 60;
  private static readonly y2 = 25;

  private static readonly a0 = +123.5;
  private static readonly a1 = -0.55166667;
  private static readonly a2 = +0.0035;
  private static readonly a3 = -0.00018933;
  private static readonly a4 = +0.00000144;

  private static readonly labelMargin = 5;

  canvasRef = viewChild('canvas', { read: ElementRef<HTMLCanvasElement> });
  levels = input.required<{ level: number; label: string }[]>();

  constructor() {
    effect(() => {
      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) {
        return;
      }

      // This has to match the size defined in the stylesheet.
      canvas.height = 130;
      canvas.width = 180;

      const ctx: any = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      ctx.reset();
      ctx.strokeStyle = '#102c57';
      ctx.lineWidth = 3;
      ctx.translate(canvas.width / 2, 0);

      for (const { level, label } of this.levels()) {
        if (level < 0 || level > 100) {
          continue;
        }
        const angleDeg = this.levelToRotationDeg(level);
        const angleRad = (angleDeg / 180) * Math.PI;
        ctx.beginPath();
        const y1 = OverlayComponent.y1;
        const y2 = OverlayComponent.y2;
        const x1 = (canvas.height - y1) / Math.tan(angleRad);
        const x2 = (canvas.height - y2) / Math.tan(angleRad);
        const x3 = x2 + OverlayComponent.labelMargin * Math.cos(angleRad);
        const y3 = y2 - OverlayComponent.labelMargin;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x3, y3);
      }
    });
  }

  private levelToRotationDeg(level: number): number {
    return (
      OverlayComponent.a0 +
      OverlayComponent.a1 * level +
      OverlayComponent.a2 * Math.pow(level, 2) +
      OverlayComponent.a3 * Math.pow(level, 3) +
      OverlayComponent.a4 * Math.pow(level, 4)
    );
  }
}
