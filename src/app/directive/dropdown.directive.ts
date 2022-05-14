import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit{
  @HostBinding('class.open') isOpen = false;
  
  @HostListener('click') toggleOpen() {
    let parent = this.elRef.nativeElement.parentElement;
    let childDropDown = parent.querySelector('.dropdown-menu');
    if (childDropDown.classList.contains('show')) {
      this.renderer.removeClass(childDropDown,'show');
    } else {
      this.renderer.addClass(childDropDown,'show');
    }
    
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

}
