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

import br.com.costs.Costs.DTO.ServicoDTO;
import br.com.costs.Costs.Service.ServicoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/servico")
public class ServicoController {
	
	@Autowired
	private ServicoService service;
	
	@GetMapping
	public List<ServicoDTO> ListarServico(){
		return service.ListarServico();
	}
	
	@PostMapping
	public ResponseEntity<String> CriarServico(@RequestBody @Valid ServicoDTO data){
		return service.CriarServico(data);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> EditarServico(@PathVariable Long id, @RequestBody @Valid ServicoDTO data) {
		return service.EditarServico(id, data);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> ExcluirService(@PathVariable Long id){
		return service.ExcluirServico(id);
	}
}
