package br.com.costs.Costs.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.costs.Costs.DTO.ProjetoDTO;
import br.com.costs.Costs.Service.ProjetoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projeto")
public class ProjetoController {
	
	@Autowired
	private ProjetoService service;
	
	@GetMapping
	public List<ProjetoDTO> ListarProjeto(){
		return service.ListarProjeto();
	}
	
	@PostMapping
	public ResponseEntity<String> CriarProjeto(@RequestBody @Valid ProjetoDTO data){
		return service.CriarProjeto(data);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> EditarProjeto(@PathVariable Long id, @RequestBody @Valid ProjetoDTO data) {
		return service.EditarProjeto(id, data);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> ExcluirProjeto(@PathVariable Long id){
		return service.ExcluirProjeto(id);
	}
}
