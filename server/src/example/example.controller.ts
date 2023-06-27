import { Controller, Get } from "@nestjs/common";
import { ExampleService } from "./example.service";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
  @Get("test")
  test() {
    return this.exampleService.test();
  }
  @Get()
  test2() {
    return this.exampleService.test2();
  }
}
