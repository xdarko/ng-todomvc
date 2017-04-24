import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
    selector: 'app-share-popup',
    template: `
        <div class="share-container">
            <div class="share-inner">
                <button (click)="onHidePopup()" class="share-close">&#10006;</button>
                <textarea #urlElement class="share-text" rows="10">{{shareUrl}}</textarea>
                <button (click)="onCopy(urlElement)" class="share-copy" [class.copied]="urlCopied" [disabled]="urlCopied">{{ urlCopied ? 'Copied!' : 'Copy URL'}}</button>
            </div>
        </div>
    `,
    styles: [`
        .share-container {
            position: absolute;
            width: 100%; height: 100%;
            top: 0; left: 0;
            z-index: 2;
            background-color: rgba(232,232,232, .5);
        }
        .share-inner {
            position: absolute;
            width: 80%;
            top: 50%; left: 50%;
            transform: translate(-50%,-50%);
            padding: 50px 0 30px;
            z-index: 2;
            background-color: #fff;
            border: 1px solid #d5d5d5;
            text-align: center;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 25px 50px 0 rgba(0, 0, 0, 0.2);
        }
        .share-text {
            display: block;
            width: 80%;
            margin: 0 auto 20px;
            border: 1px solid #d5d5d5;
            resize: none;
            transition: box-shadow .1s ease;
        }
        .share-text:focus {
            box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);
        }
        .share-close {
            position: absolute;
            top: 6px; right: 16px;
            font-size: 24px;
            color: #cc9a9a;
            cursor: pointer;
        }
        .share-close:hover {
            color: #af5b5e;
        }
        .share-copy {
            padding: 6px 16px 8px;
            color: #70c9b8;
            border: 1px solid #cae1dd;
            border-radius: 6px;
            cursor: pointer;
        }
        .share-copy.copied {
            color: #fff;
            font-weight: bold;
            background-color: #70c9b8;
            border-color: #70c9b8;
            cursor: default;
        }
        .share-copy:hover {
            border-color: #70c9b8;
        }
        `
    ]
})
export class SharePopupComponent implements OnInit {
    constructor(private _todosService:TodosService, private _clipboardService:ClipboardService) {}

    @Output() togglePopup:EventEmitter<boolean> = new EventEmitter<boolean>();
    shareUrl:string;
    urlCopied:boolean = false;

    ngOnInit() {
        const urlAddress = `${window.location.origin}${window.location.pathname}`;
        const todosData = this._todosService.getStringifiedTodos();
        this.shareUrl = urlAddress + '#/share/' + todosData;
    }

    onHidePopup() {
        this.togglePopup.emit(false);
    }

    onCopy(urlElement:HTMLInputElement) {
        this._clipboardService.copyElementValue(urlElement);
        this.urlCopied = true;
    }
}
